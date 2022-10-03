import { SearchInput } from '@patternfly/react-core';
import React from 'react';
import { TestIds } from '../test-ids';
import { ExecuteQueryButton } from './execute-query-button';
import './logs-query-input.css';

interface LogsQueryInputProps {
  value: string;
  onChange?: (expression: string) => void;
  onRun?: (expression: string) => void;
}

export const LogsQueryInput: React.FC<LogsQueryInputProps> = ({
  value,
  onChange,
  onRun,
}) => {
  const [searchValue, setSearchValue] = React.useState(value);

  React.useEffect(() => {
    onChange?.(searchValue);
  }, [searchValue]);

  React.useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleSearchClear = () => {
    setSearchValue('');
  };

  const handleRunQuery = () => {
    onRun?.(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onRun?.(searchValue);
    }
  };

  return (
    <div
      className="co-logs-expression-input"
      data-test={TestIds.LogsQueryInput}
    >
      <SearchInput
        className="co-logs-expression-input__searchInput"
        placeholder="LogQL Query"
        value={searchValue}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
        onKeyDown={handleKeyDown}
      />
      {onRun && (
        <ExecuteQueryButton
          onClick={handleRunQuery}
          isDisabled={value === undefined || value.length === 0}
        />
      )}
    </div>
  );
};
