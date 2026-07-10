import { LucideIcon } from 'lucide-react';
import React from 'react';

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: React.ReactNode;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? '+' : '';
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';

  const getIconColor = (value: number) => 
    value >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div 
      className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between overflow-hidden border border-gray-100"
      data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="font-bold text-base text-gray-800">{title}</h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
            {dateRange}
          </span>
        </div>
        <hr className="border-gray-100" />
      </div>

      {/* BODY CONTAINER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 flex-grow">
        {/* ICON COMPONENT */}
        <div className="flex-shrink-0 mx-auto sm:mx-0 rounded-2xl p-4 bg-blue-50/70 border-blue-100 border text-blue-600 grid place-items-center shadow-sm">
          {primaryIcon}
        </div>
        
        {/* CONTENT ROSTER */}
        <div className="flex-1 w-full space-y-3.5">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-gray-400 truncate">
                    {detail.title}
                  </span>
                  <span className="font-bold text-gray-800 text-base mt-0.5">
                    {detail.amount}
                  </span>
                </div>

                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg font-semibold text-xs transition-colors ${getChangeColor(detail.changePercentage)}`}>
                  <detail.IconComponent
                    className={`w-3.5 h-3.5 ${getIconColor(detail.changePercentage)}`}
                  />
                  <span>
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr className="border-gray-100/80" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;