const EmptyState = ({ icon: Icon, title, description, actionButton }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {Icon && (
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      )}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        )}
      </div>
      {actionButton && <div className="mt-4">{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
