import clsx from "clsx";


const threeColumnHeights = [
  [200, 450, 300, 600],
  [300, 600, 250, 400],
  [240, 500, 600, 210],
];

export const MasonryListSkeleton = () => <div className='w-full py-10 xl:py-12 px-4 md:px-8 xl:px-28 animate-pulse'>
  <div
    className="w-full grid grid-cols-2 xl:grid-cols-3 gap-x-2"
  >
    {threeColumnHeights.map((column, colIdx) => (
      <div key={`col-${colIdx}`} className={clsx("flex flex-col gap-2 col-span-1", {
        'hidden xl:flex': colIdx === 2
      })}  >
        {column.map(renderSkeletonBox)}
      </div>
    ))}
  </div>
</div>

const renderSkeletonBox = (height: number, index: number) => (
  <div
    key={`skeleton-box-${index}`}
    className={`w-full bg-gray-200 rounded-lg`}
    style={{ height }}
  />
);