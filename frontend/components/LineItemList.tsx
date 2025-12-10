import { WorkOrderDetail } from '../lib/api';

interface LineItemListProps {
  details: WorkOrderDetail[];
}

export default function LineItemList({ details }: LineItemListProps) {
  if (!details || details.length === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        No line items found
      </div>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-gray-900 mb-3">Line Items</h4>
      <div className="space-y-2">
        {details.map((detail) => {
          const { lineItem } = detail;
          const isService = lineItem.itemType === 'service';
          const totalPrice = detail.quantity * detail.cachedPrice;

          return (
            <div
              key={detail.id}
              className={`p-3 rounded-lg border ${
                isService 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">
                      {lineItem.sku}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isService
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {isService ? 'Service' : 'Product'}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">
                    {lineItem.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Qty: {detail.quantity}</span>
                    <span>Unit Price: {formatPrice(detail.cachedPrice)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}