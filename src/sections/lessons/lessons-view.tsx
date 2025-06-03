import { useState } from "react";
import BoxMain from "../components/box-main";
import LessonList from "./components/lessson-list";
import { MenuLesson } from "./components/menu-lesson";

const LessonsView = () => {
  const [catId, setCatId] = useState("");
  return (
    <BoxMain>
      <div className="lg:mx-[300px] ">
        <div className="flex gap-2">
          <MenuLesson
            onCat={(value: string) => {
              setCatId(value);
            }}
          />
          <div className="w-full h-auto bg-gradient-to-b from-[#94ee5f] to-[#58cc02] p-4 text-white rounded-md">
            <LessonList id={catId} />
          </div>
        </div>
      </div>
    </BoxMain>
  );
};

export default LessonsView;
