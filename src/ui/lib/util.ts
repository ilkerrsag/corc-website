import _ from 'lodash';

export const randomSubArr = <T>(arr: T[], min = 1, max = arr.length) => [
	..._.sampleSize(arr, _.random(min, max))
];

export const timeSince = (date: string | number | Date) => {
	const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
	let intervalType;
	let interval = Math.floor(seconds / 31536000);
	if (interval >= 1) {
		intervalType = 'year';
	} else {
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1) {
			intervalType = 'month';
		} else {
			interval = Math.floor(seconds / 86400);
			if (interval >= 1) {
				intervalType = 'day';
			} else {
				interval = Math.floor(seconds / 3600);
				if (interval >= 1) {
					intervalType = 'hour';
				} else {
					interval = Math.floor(seconds / 60);
					if (interval >= 1) {
						intervalType = 'minute';
					} else {
						interval = seconds;
						intervalType = 'second';
					}
				}
			}
		}
	}

	if (interval > 1 || interval === 0) {
		intervalType += 's';
	}

	return interval + ' ' + intervalType;
};

export const diffKeys = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
	const diff = Object.keys(obj1).reduce((result, key) => {
		if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
			result.push(key);
		} else if (_.isEqual(obj1[key], obj2[key])) {
			const resultKeyIndex = result.indexOf(key);
			result.splice(resultKeyIndex, 1);
		}
		return result;
	}, Object.keys(obj2));

	return diff;
};

export const getFadedOfRgb = (color: string, opacity = 0.2) =>
	color.replaceAll('rgb', 'rgba').replaceAll(')', `,${opacity})`);

export const normalizeTurkish = (str: string) =>
	str
		.toLowerCase()
		.replace(/ğ/g, 'g')
		.replace(/ü/g, 'u')
		.replace(/ş/g, 's')
		.replace(/ı/g, 'i')
		.replace(/i̇/g, 'i')
		.replace(/İ/g, 'i')
		.replace(/ö/g, 'o')
		.replace(/ç/g, 'c');

export const formatFileName = (fileName: string, maxSize = 20) => {
	const extensionIndex = fileName.lastIndexOf('.');
	if (extensionIndex === -1 || extensionIndex === 0 || extensionIndex === fileName.length - 1) {
		throw new Error('Invalid filename');
	}

	const namePart = fileName.substring(0, extensionIndex);
	const extension = fileName.substring(extensionIndex);

	if (namePart.length <= maxSize) {
		return fileName;
	}

	return namePart.slice(0, 5) + '...' + namePart.slice(-5) + extension;
};

export const formatBytes = (bytes: number) => {
	if (bytes === 0) return '0B';
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};
