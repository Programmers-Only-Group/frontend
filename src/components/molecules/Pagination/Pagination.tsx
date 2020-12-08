import React, { useCallback, useEffect, useState } from 'react';
import usePaginationControl from 'hooks/usePaginationControl';
import { StyledList } from './Pagination.styled';
import PaginationButton from './PaginationButton';
import { IPagination, IVisibleButtons } from './Pagination.model';

const Pagination = ({
  isLoading,
  resolvedData,
  latestData,
  page,
  setPage,
}: IPagination): JSX.Element => {
  const [visibleButtonsOfNumbers, setVisibleButtonsOfNumbers] = useState<IVisibleButtons>([]);

  /// oddNumberOfButtons = temporary variable - in the future should be set by width of window
  const oddNumberOfButtons = 3;
  const FIRST_PAGE = 1;

  const { setFirstPage, setPrevPage, setNextPage, setLastPage } = usePaginationControl();

  function createArrayOfButtons(currentPage: number, totalPages: number) {
    const SCOPE = 1;
    const DIVIDING_NUMBER = 2;
    let start = currentPage;
    let end = currentPage + oddNumberOfButtons;

    if (start > SCOPE && oddNumberOfButtons > SCOPE) {
      end -= Math.floor(oddNumberOfButtons / DIVIDING_NUMBER);
      start -= Math.floor(oddNumberOfButtons / DIVIDING_NUMBER);
    }

    if (end > totalPages && !(oddNumberOfButtons <= SCOPE)) {
      end = totalPages + SCOPE;
      start = currentPage - oddNumberOfButtons + SCOPE;
    }
    // downlevelIteration
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html
    // [...Array(end - start).keys()].map((i) => console.log(typeof i));
    return [...Array(end - start).keys()].map((i) => i + start);
  }

  const createButtonsOfNumbers = useCallback(() => {
    function doesArrayConsistNumber(oneOfVisibleNumbers: number) {
      return visibleButtonsOfNumbers.includes(oneOfVisibleNumbers);
    }

    if (!isLoading && !doesArrayConsistNumber(page))
      setVisibleButtonsOfNumbers(createArrayOfButtons(page, resolvedData.totalPages));
  }, [page, isLoading, resolvedData, visibleButtonsOfNumbers]);

  useEffect(() => {
    createButtonsOfNumbers();
  }, [createButtonsOfNumbers, visibleButtonsOfNumbers]);

  function renderButtonsOfNumbers(currentPage: number) {
    return visibleButtonsOfNumbers.map((numberOfButton: number) => {
      const isCurrent = numberOfButton === currentPage;
      const isDisable = numberOfButton > resolvedData.totalPages;
      return (
        <li key={numberOfButton}>
          <PaginationButton
            type="button"
            onClick={() => setPage(numberOfButton)}
            disabled={isDisable}
            isCurrent={isCurrent}
          >
            {numberOfButton}
          </PaginationButton>
        </li>
      );
    });
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StyledList>
          <PaginationButton
            type="button"
            onClick={() => setPage(setFirstPage(FIRST_PAGE))}
            disabled={!latestData || page === 1}
          >
            First Page
          </PaginationButton>
          <PaginationButton
            type="button"
            onClick={() => setPage(setPrevPage(page))}
            disabled={!latestData || page === 1}
          >
            Previous Page
          </PaginationButton>
          {renderButtonsOfNumbers(page)}
          <PaginationButton
            type="button"
            onClick={() => setPage(setNextPage(page))}
            disabled={!latestData || page === resolvedData.totalPages}
          >
            Next Page
          </PaginationButton>
          <PaginationButton
            type="button"
            onClick={() => setPage(setLastPage(latestData.totalPages))}
            disabled={!latestData || page === resolvedData.totalPages}
          >
            Last Page
          </PaginationButton>
        </StyledList>
      </div>
    </>
  );
};

export default Pagination;
