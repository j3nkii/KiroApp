'use client';

import { useState } from 'react';
import { WorkOrder } from '../lib/api';
import LineItemList from './LineItemList';

interface WorkOrderCardProps {
  workOrder: WorkOrder;
}

export default function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Main card content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Work Order #{workOrder.id}
            </h3>
            <p className="text-sm text-gray-600">
              Created: {formatDate(workOrder.dateCreated)}
            </p>
            {workOrder.lastUpdated !== workOrder.dateCreated && (
              <p className="text-sm text-gray-600">
                Updated: {formatDate(workOrder.lastUpdated)}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              {formatPrice(workOrder.totalAmount)}
            </div>
          </div>
        </div>

        {/* Customer information */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Customer</h4>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-gray-800">
              {workOrder.customer.fullName}
            </p>
            {workOrder.customer.primaryPhone && (
              <p className="text-gray-600">
                Phone: {workOrder.customer.primaryPhone}
              </p>
            )}
            {workOrder.customer.email && (
              <p className="text-gray-600">
                Email: {workOrder.customer.email}
              </p>
            )}
          </div>
        </div>

        {/* Summary info */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {workOrder.details.length} line item{workOrder.details.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={toggleExpanded}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          >
            {isExpanded ? 'Hide Details' : 'Show Details'}
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Expandable line items section */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <LineItemList details={workOrder.details} />
        </div>
      )}
    </div>
  );
}