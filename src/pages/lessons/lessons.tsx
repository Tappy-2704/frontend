// ----------------------------------------------------------------------

import LessonsView from "@/sections/lessons/lessons-view";

const metadata = "Lessons";

export default function Page() {
  return (
    <>
      <div>
        <title>{metadata}</title>
      </div>

      <div>
        <LessonsView />
      </div>
    </>
  );
}
