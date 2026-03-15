import { Topic } from "@/lib/database.types";

export default function TopicNode({
  topic,
  allTopics,
  level,
  onAddTopic,
}: {
  topic: Topic;
  allTopics: Topic[];
  level: number;
  onAddTopic: (topic: Topic | null, editing: boolean) => void;
}) {
  const children = allTopics.filter((item) => item.parent_id === topic.tpc_id);

  return (
    <li>
      <div
        className="space-y-1 rounded-md border border-slate-700 bg-slate-800 p-3"
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex">
          <p className="font-semibold text-white">{topic.tpc_title}</p>
          <button
            type="button"
            onClick={() => onAddTopic(topic,true)}
            className="rounded-md underline px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-700"
          >
            edit Topic
          </button>
          </div>
          <button
            type="button"
            onClick={() => onAddTopic(topic,false)}
            className="rounded-md border border-slate-500 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-700"
          >
            Add Topic
          </button>
        </div>
      </div>

      {children.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {children.map((child) => (
            <TopicNode
              key={child.tpc_id}
              topic={child}
              allTopics={allTopics}
              level={level + 1}
              onAddTopic={onAddTopic}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
