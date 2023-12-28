import logo from "../assets/images/logo.svg";

export default function InitialPage({ setPosition }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <img src={logo} alt="Garbageman" />
      <h1 className="font-bold pb-2">Recycling for Households</h1>
      <button
        className="bg-[#EABD2C] px-8 py-2 rounded-md text-black "
        onClick={() => setPosition("form")}
      >
        SIGN UP
      </button>
    </div>
  );
}
