// components/FilterSidebar.tsx
import { FC } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

interface FilterSidebarProps {
  tripDuration: number[];
  priceRange: number[];
  handleTripDurationChange: (event: Event, newValue: number | number[]) => void;
  handlePriceRangeChange: (event: Event, newValue: number | number[]) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({
  tripDuration,
  priceRange,
  handleTripDurationChange,
  handlePriceRangeChange
}) => (
  <aside className="col-span-1 bg-white rounded-lg shadow-lg p-6">
    <div className="sticky top-24">
      {/* Filter Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-brand-purple-900 mb-4">Filter Destinations</h2>
        
        <div className="mb-4">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Trip Duration (Days)
          </Typography>
          <Slider
            value={tripDuration}
            onChange={handleTripDurationChange}
            valueLabelDisplay="auto"
            min={1}
            max={30}
            sx={{
              color: '#3f51b5',
              '& .MuiSlider-thumb': {
                height: 24,
                width: 24,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
              },
              '& .MuiSlider-track': {
                height: 8,
              },
              '& .MuiSlider-rail': {
                height: 8,
                opacity: 0.3,
              },
            }}
          />
        </div>

        <div className="mb-4">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Price Range (Euros)
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={100}
            max={5000}
            sx={{
              color: '#3f51b5',
              '& .MuiSlider-thumb': {
                height: 24,
                width: 24,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
              },
              '& .MuiSlider-track': {
                height: 8,
              },
              '& .MuiSlider-rail': {
                height: 8,
                opacity: 0.3,
              },
            }}
          />
        </div>
      </section>
    </div>
  </aside>
);

export default FilterSidebar;
