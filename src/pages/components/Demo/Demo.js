import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty';
import { API_ROUTE, DICTIONARY_APP_URL } from '../../../siteConstants';

const Demo = ({ searchWord, words }) => {
  const [keyword, setKeyword] = useState(searchWord);
  const [productionUrl, setProductionUrl] = useState('');
  const responseBody = JSON.stringify(words, null, 4);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProductionUrl(window.origin);
      if (keyword) {
        window.location.hash = 'try-it-out';
      }
    }
  }, []);

  const onSubmit = (e) => {
    e?.preventDefault();
    window.location.href = `/?word=${keyword}`;
  };

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex justify-center mb-16">
      <div className="flex flex-col items-center md:items-start lg:flex-row lg:space-x-10">
        <div className="demo-inputs-container space-y-5">
          <form onSubmit={onSubmit} className="flex flex-col w-full space-y-5">
            <p className="self-center md:self-start">
              {'Enter a word in either English or Igbo to see it\'s information'}
            </p>
            <input
              onInput={(e) => setKeyword(e.target.value)}
              onKeyPress={onEnter}
              className="h-12 w-full border-current border-solid border-2 rounded-md px-3 py-5"
              placeholder="i.e. please or biko"
              defaultValue={searchWord}
            />
            <input
              disabled
              value={`${productionUrl || API_ROUTE}/api/v1/words?keyword=${keyword}`}
              className="w-full py-3 px-5"
            />
            <button
              type="submit"
              className="primary-button w-full"
            >
              Submit
            </button>
            <p className="text-l text-center text-gray-700 self-center mb-24">
              {'Want to see how this data is getting used? Take a look at the '}
              <a className="link" href={DICTIONARY_APP_URL}>
                dictionary app
              </a>
            </p>
          </form>
        </div>
        <div className="flex flex-col w-full lg:w-auto">
          <h3
            className="text-center lg:text-left self-center w-full lg:w-auto lg:self-start text-2xl mb-5 mt-10 lg:mt-0"
          >
            Response
          </h3>
          <JSONPretty className="w-full self-center lg:w-auto jsonPretty" id="json-pretty" data={responseBody} />
        </div>
      </div>
    </div>
  );
};

Demo.propTypes = {
  searchWord: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.shape({})),
};

Demo.defaultProps = {
  searchWord: '',
  words: [],
};

export default Demo;
