const limitTextString = (text: string, limit: number) => {
	return text.substring(0, limit);
};

const textLimitError = (text: string, limit: number) => {
	return text.length > limit;
};

export { limitTextString, textLimitError };
