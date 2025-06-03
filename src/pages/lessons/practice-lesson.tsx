// ----------------------------------------------------------------------

import PracticeLessonView from "@/sections/lessons/practice-lesson-view";

const metadata = "Lessons";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <PracticeLessonView />
      </div>
    </>
  );
}
