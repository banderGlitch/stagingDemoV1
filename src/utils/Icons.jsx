import { 
    IoLogOutOutline, 
  } from "react-icons/io5";
 import { IoIosRefresh } from "react-icons/io";
  import { TiTickOutline } from "react-icons/ti";
  import { BsCircleHalf } from "react-icons/bs";
  import { 
    FaLink, 
    FaWallet, 
    FaChartLine, 
    FaCog, 
    FaCopy, 
    FaChevronDown, 
    FaChevronUp, 
    FaChevronRight, 
    FaCheck, 
    FaDotCircle,
    FaSpinner,
    FaArrowRight
  } from 'react-icons/fa';
  import { VscCollapseAll } from "react-icons/vsc";
  
  const Icons = {
    LogOut: IoLogOutOutline,
    Refresh: IoIosRefresh,
    Tick: TiTickOutline,
    ArrowRight: FaArrowRight,
    CircleHalf: BsCircleHalf,
    Link: FaLink,
    Wallet: FaWallet,
    ChartLine: FaChartLine,
    Cog: FaCog,
    Copy: FaCopy,
    ChevronDown: FaChevronDown,
    ChevronUp: FaChevronUp,
    ChevronRight: FaChevronRight,
    Check: FaCheck,
    DotCircle: FaDotCircle,
    Spinner: FaSpinner,
    CollapseAll: VscCollapseAll
  };
  



  const IconComponent = ({ name, ...props }) => {
    const IconComponent = Icons[name];
    
    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`);
      return null;
    }
    
    return <IconComponent {...props} />;
  };


  export { Icons, IconComponent };




