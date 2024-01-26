export class FeedSchema{
    title: string;
	description: string;
	link: string;
	guid: {
		_: string;
		isPermaLink: string;
	};
	pubDate: string;
}

export interface RssFeed {
	rss: {
		channel: {
			item: FeedSchema[];
		};
	};
}