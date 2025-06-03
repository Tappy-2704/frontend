import { useArticle } from "@/hooks/actions/useLesson";
import TaskBarLesson from "./task-bar-lesson";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";

interface Props {
  id: string;
}

const LessonList = ({ id }: Props) => {
  const router = useRouter();
  const { artEmpty, article, artFetching } = useArticle({ catId: id });

  // call api
  return (
    <div>
      {!artFetching &&
        !artEmpty &&
        article?.results.map((item) => (
          <TaskBarLesson
            key={item._id}
            stt={1}
            title={item.name}
            onclick={() => {
              router.replaceParams(paths.practiceLesson(item._id), {
                lesson: item,
              });
            }}
          />
        ))}
    </div>
  );
};

export default LessonList;
