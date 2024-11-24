const Button = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
  >
    {text}
  </button>
);

export default Button;
