import { type Schema } from "@/lib/zero/schema";
import { escapeLike } from "@rocicorp/zero";
import { useQuery, useZero } from "@rocicorp/zero/react";

export type MessagesQueryItem = ReturnType<typeof messagesQuery>[number];

type ClientsColumnNames = keyof Schema["tables"]["message"]["columns"];

type FilterProps = {
	sort: ClientsColumnNames;
	sortDir: "asc" | "desc";
	filter: string | undefined;
};

export function messagesQuery(
	filters: FilterProps | null | undefined = {
		sort: "id",
		sortDir: "desc",
		filter: undefined,
	},
) {
	const defaultFilters = {
		sort: "id",
		sortDir: "desc",
		filter: undefined,
	} as FilterProps;

	const { sort, sortDir, filter } = {
		...defaultFilters,
		...(filters ?? {}),
	};

	const z = useZero<Schema>();

	console.log("calling query, what are props?", sort, sortDir);

	// Need to set a senderID to make this work!
	const senderID = "";
	let query = z.query.message
		.whereExists("sender", (q) => q.where("id", "7VoEoJWEwn"))
		.related("sender", (q) => q.one())
		.orderBy(sort, sortDir);

	if (filter) {
		query = query.where(({ or, cmp }) =>
			or(
				cmp("body", "ILIKE", `%${escapeLike(filter)}%`),
				cmp("id", "ILIKE", `%${escapeLike(filter)}%`),
			),
		);
	}

	return useQuery(query);
}
