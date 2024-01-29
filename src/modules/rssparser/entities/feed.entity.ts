export class FeedSchema{
    title: string;
	description: string;
	link: string;
	pubDate: Date;
}

export interface RssFeed {
	rss: {
		channel: {
			item: FeedSchema[];
		};
	};
}