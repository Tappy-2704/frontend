interface Props {
  stt: number;
  title: string;
  onclick: () => void;
}

const TaskbarProps = ({ stt, title, onclick }: Props) => {
  return (
    <div className="flex items-center justify-between bg-white text-black p-[20px] my-[20px] rounded-xl shadow-md">
      <div className="flex gap-2 items-center">
        <div className="border-2 border-[#d5d5d5] rounded-full p-2 w-8 h-8 flex items-center justify-center">
          {stt}
        </div>

        <div>
          <span className="text-[#4a4a4a] font-bold">{title}</span>
        </div>
      </div>
      <div className="">
        <button
          onClick={onclick}
          className="border rounded-md bg-[#ffcf46] p-2 flex items-center justify-center gap-3 w-[120px] hover:bg-[#ffebb1]"
        >
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#6d5825] -rotate-90" />
          <span className="text-[#6d5825] font-bold">Start</span>
        </button>
      </div>
    </div>
  );
};

export default TaskbarProps;
