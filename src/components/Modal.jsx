import cross from "../assets/images/cross.svg";

export default function Modal({ open, control, children, width, bg, padding }) {
  return (
    open && (
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-40 flex justify-center items-center">
        <div
          className={`relative bg-white max-h-[750px] max-w-[900px] w-full  h- mx-4 shadow-xl py-40 ${
            padding ? padding : "p-10 md:p-20"
          } rounded`}
        >
          <span
            className="absolute top-10 right-10 z-50 cursor-pointer rounded-full  p-2"
            onClick={control}
          >
            <img src={cross} className="fill-black  w-8  h-8  z-50" />
          </span>
          {children}
        </div>
      </div>
    )
  );
}
