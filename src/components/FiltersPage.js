import React, {useState, useEffect} from 'react';
import Page from './Page';
import Loading from './Loading';
import TagsManager from './TagsManager';
import Separator from './Separator';

const OR_FILTER_TYPE = 'or';
const AND_FILTER_TYPE = 'and';

export default ({
  isCurrentPage,
  filters,
  setFilters,
  filterType,
  setFilterType,
  moveToMealsListPage
}) => {
  const createFilterTypeClickCallback = (filterTypeClicked) => () => {
    setFilterType(filterTypeClicked);
  }

  return (
    <Page className="filters-page" isCurrentPage={isCurrentPage}>
      <TagsManager
        selectedTags={filters}
        updateTags={setFilters}
        title="לפי איזה תגיות לסנן?"
      />

      <Separator icon="🥞" />

      <div className="or-and-chooser">
        <div
          className={`button or-button ${filterType === OR_FILTER_TYPE ? 'selected' : ''}`}
          onClick={createFilterTypeClickCallback(OR_FILTER_TYPE)}
        >
          או
        </div>
        <div
          className={`button and-button ${filterType === AND_FILTER_TYPE ? 'selected' : ''}`}
          onClick={createFilterTypeClickCallback(AND_FILTER_TYPE)}
        >
          וגם
        </div>
      </div>

      <Separator icon="🍉" />

      <div className="controls">
        <div className="button" onClick={moveToMealsListPage}>סנן</div>
        <div className="button" onClick={() => setFilters({})}>נקה</div>
      </div>
    </Page>
  );
}
