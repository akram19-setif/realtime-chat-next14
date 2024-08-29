import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface MobileItemProps {
  label: string;
  href: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
}
const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `flex  items-center w-full gap-x-3 justify-center p-4  text-sm font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
        active && `bg-gray-100 text-black`
      )}
    >
      <Icon className='w-6 h-6' />
    </Link>
  );
};

export default MobileItem;
