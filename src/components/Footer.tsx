import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <div className="whitespace-nowrap2 mr-5 mb-5 fixed bottom-0 font-medium right-0 text-slate-100 text-xs inline-flex items-center justify-center px-2 py-2 border border-transparent rounded-md shadow-xl bg-indigo-800 hover:bg-indigo-750">
      &nbsp;
      <span className="text-slate-100">
        <FontAwesomeIcon icon={faCopyright} />
        &nbsp;di-choi.com.
        Some rights reserved.
      </span>
    </div>
  );
};

export default Footer;
