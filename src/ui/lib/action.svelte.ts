import { FormError } from '#ui/components/form/index.js';
import type { OptionalIdNotification } from '#ui/lib/notification-manager.js';
import { notificationManager } from '#ui/lib/notification-manager.js';

export interface ActionOptions<Result, Args extends unknown[]> {
	onSuccess?: (result: Result, args: Args) => void;
	onError?: (error: Error) => void;
	onFinally?: () => void;
	preventDuplicates?: boolean;
	successNotification?:
		OptionalIdNotification | ((result: Result, args: Args) => OptionalIdNotification);
}

export class Action<Args extends unknown[], Result> {
	public executing = $state(false);
	public error = $state<Error | null>(null);
	public result = $state<Result | null>(null);
	public succeeded = $derived(this.result !== null && this.error === null);

	constructor(
		private api: (...args: Args) => Promise<Result>,
		private options?: ActionOptions<Result, Args>
	) {}

	public execute = async (...args: Args): Promise<Result | null> => {
		if (this.executing && this.options?.preventDuplicates !== false) {
			return null;
		}

		this.executing = true;
		this.error = null;

		try {
			const res = await this.api(...args);
			this.result = res;

			// Show success notification if provided
			if (this.options?.successNotification) {
				const notification =
					typeof this.options.successNotification === 'function'
						? this.options.successNotification(res, args)
						: this.options.successNotification;

				notificationManager.addNotification({
					...notification,
					success: true
				});
			}

			this.options?.onSuccess?.(res, args);
			return res;
		} catch (e: unknown) {
			// Handle error notifications
			if (e instanceof FormError) {
				notificationManager.addNotification({
					title: 'Form hatalı',
					text: 'Kırmızı alanları düzeltip tekrar dene.',
					warning: true
				});
			} else {
				notificationManager.addNotification({
					title: 'Bir şeyler ters gitti',
					text: 'Birazdan tekrar dene.',
					error: true
				});
			}

			this.error = e instanceof Error ? e : new Error(String(e));
			this.result = null;
			this.options?.onError?.(this.error);
			return null;
		} finally {
			this.executing = false;
			this.options?.onFinally?.();
		}
	};

	public reset = () => {
		this.executing = false;
		this.error = null;
		this.result = null;
	};
}

export function createAction<Args extends unknown[], Result>(
	api: (...args: Args) => Promise<Result>,
	options?: ActionOptions<Result, Args>
): Action<Args, Result> {
	return new Action(api, options);
}
