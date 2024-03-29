import type {Extension as MicromarkExtension} from 'micromark-util-types';
import type {Extension as FromMarkdownExtension} from 'mdast-util-from-markdown';
import type {Processor} from 'unified';
import {micromarkExtension} from './micromark/index.js';
import {createTransform} from './transform/index.js';
import {fromMarkdownExtension} from './from-markdown.js';

declare module 'unified' {
	interface Data {
		micromarkExtensions?: MicromarkExtension[];
		fromMarkdownExtensions?: Array<
			FromMarkdownExtension | FromMarkdownExtension[]
		>;
	}
}

export interface Options {
	allowNoSpaceBeforeName?: boolean;
	allowUnderscoreInId?: boolean;
	allowNoPosition?: boolean;
}

export default function remarkAttributeList(
	this: Processor,
	options?: Options,
) {
	const data = this.data();

	data.micromarkExtensions ??= [];
	data.micromarkExtensions.push(micromarkExtension(options));

	data.fromMarkdownExtensions ??= [];
	data.fromMarkdownExtensions.push(fromMarkdownExtension);

	return createTransform(options);
}
