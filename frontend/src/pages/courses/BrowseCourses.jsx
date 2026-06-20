import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { publicService } from '../../services/publicService';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';

const CATEGORIES = [
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'business', label: 'Business' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'other', label: 'Other' },
];

const LEVELS = [
  { value: '', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'all', label: 'All Levels (Course)' },
];

export default function BrowseCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await publicService.getPublishedCourses({
          search,
          category,
          level,
          sort,
          page,
          limit: 12,
        });
        // Handle both old shape (array) and new shape (object with courses)
        if (Array.isArray(data.data)) {
          setCourses(data.data);
          setTotalPages(1);
          setTotalCourses(data.data.length);
        } else {
          setCourses(data.data.courses);
          setTotalPages(data.data.totalPages);
          setTotalCourses(data.data.totalCourses);
        }
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCourses();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category, level, sort, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, level, sort]);

  const clearFilters = () => {
    setCategory('');
    setLevel('');
    setSearch('');
    setSort('newest');
    setPage(1);
  };

  const hasActiveFilters = category || level || search;

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full px-gutter max-w-container-max mx-auto py-lg">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface mb-2">
            Explore Courses
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Discover the perfect course to advance your skills.
            {!loading && <span className="ml-2 text-body-sm text-on-surface-variant">({totalCourses} courses)</span>}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden mb-4 flex items-center gap-2 bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 w-full text-left font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">filter_list</span>
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="ml-auto bg-primary text-on-primary text-xs font-bold px-2 py-0.5 rounded-full">Active</span>
          )}
          <span className="material-symbols-outlined ml-auto text-on-surface-variant">
            {filtersOpen ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
          {/* Sidebar Filters */}
          <aside className={`md:col-span-3 space-y-md ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-label-md font-label-md text-on-background">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:underline font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-sm">
                <label className="block text-label-caps font-label-caps text-on-surface-variant mb-2">CATEGORY</label>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <label key={cat.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat.value}
                        onChange={() => setCategory(category === cat.value ? '' : cat.value)}
                        onClick={() => setCategory(category === cat.value ? '' : cat.value)}
                        className="rounded text-primary focus:ring-primary border-outline-variant"
                      />
                      <span className="text-body-sm font-body-sm text-on-surface group-hover:text-primary transition-colors">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-sm">
                <label className="block text-label-caps font-label-caps text-on-surface-variant mb-2">LEVEL</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-2 text-body-sm font-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                >
                  {LEVELS.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-9 space-y-md">
            {/* Search & Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
              <div className="relative w-full sm:w-1/2">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-full text-body-sm font-body-sm focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim outline-none transition-all"
                  placeholder="Find specific topics..."
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-body-sm font-body-sm text-on-surface-variant">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-surface-container-lowest border border-outline-variant rounded-lg p-2 text-body-sm font-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Course Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
                    <Skeleton className="w-full h-40 rounded-none" />
                    <div className="p-md space-y-3">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : courses.length === 0 ? (
              <EmptyState 
                icon="search_off" 
                title="No courses found" 
                description="Try adjusting your search or filters." 
                actionText={hasActiveFilters ? "Clear all filters" : null} 
                onClick={hasActiveFilters ? clearFilters : null} 
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
                {courses.map(course => (
                  <div key={course._id} className="bg-surface-container-lowest rounded-xl border border-surface-container-low shadow-sm hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 flex flex-col overflow-hidden group">
                    <div className="relative w-full h-40 overflow-hidden">
                      <img
                        src={course.thumbnailUrl || 'https://via.placeholder.com/400x200?text=No+Thumbnail'}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-md flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-label-caps font-label-caps capitalize">
                          {course.category}
                        </span>
                        <span className="text-body-sm font-body-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                          {course.averageRating || 'New'}
                        </span>
                      </div>
                      <h4 className="text-body-lg font-body-lg font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-body-sm font-body-sm text-on-surface-variant mb-4 line-clamp-2">
                        {course.subtitle || course.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-outline-variant">
                        <span className="text-headline-sm font-headline-sm text-primary font-bold">
                          {course.price === 0 ? 'Free' : `₹${course.price.toFixed(2)}`}
                        </span>
                        <Link to={`/courses/${course._id}`} className="px-4 py-2 bg-primary-container text-on-primary-container rounded-[16px] text-label-md font-bold hover:bg-primary hover:text-on-primary transition-colors">
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-lg">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-surface hover:bg-surface-container-low text-on-surface-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, page - 3),
                  Math.min(totalPages, page + 2)
                ).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg font-label-md text-label-md flex items-center justify-center transition-colors ${
                      p === page
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface hover:bg-surface-container-low text-on-surface-variant'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg bg-surface hover:bg-surface-container-low text-on-surface-variant transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
