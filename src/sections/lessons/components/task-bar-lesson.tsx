interface Props {
  stt: number;
  title: string;
  onclick: () => void;
}

const TaskBarLesson = ({ stt, title, onclick }: Props) => {
  return (
    <div className="flex items-center justify-between bg-white text-black p-[20px] my-[20px] rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex gap-2 items-center transition-all duration-300 hover:scale-[1.02]">
        <div className="border-2 border-[#d5d5d5] rounded-full p-2 w-8 h-8 flex items-center justify-center transition-all duration-300 hover:border-[#ffcf46]">
          {stt}
        </div>

        <div>
          <span className="text-[#4a4a4a] font-bold transition-all duration-300 hover:text-[#58cc02]">
            {title}
          </span>
        </div>
      </div>

      <div className="transition-all duration-300 hover:scale-[1.03]">
        <button
          onClick={onclick}
          className="border rounded-md bg-[#ffcf46] p-2 flex items-center justify-center gap-3 w-[120px] hover:bg-[#ffebb1] transition-all duration-300"
        >
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#6d5825] -rotate-90 transition-all duration-300" />
          <span className="text-[#6d5825] font-bold">Start</span>
        </button>
      </div>
    </div>
  );
};

export default TaskBarLesson;
