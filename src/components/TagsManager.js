import React, {useState, useEffect} from 'react';
import {fetchTags} from '../services/api';
import Loading from './Loading';

export default ({updateTags, selectedTags}) => {
  const [tags, setTags] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTags().then(tags => {
      setIsLoading(false);
      setTags(tags);
    });
  }, []);

  return (
    <div className="tag-manager-container">
      <div className="title">להוסיף תגיות למנה?</div>
      {isLoading ?
        <Loading text="טוען תאגים..." loadingSize="small" />
        :
        <div className="tags-list">
          {Object.keys(tags).map(tagId => {
            const tag = tags[tagId];
            const onClick = () => {
              if (selectedTags[tagId]) {
                const newSelectedTags = {...selectedTags};
                Reflect.deleteProperty(newSelectedTags, tagId);

                updateTags(newSelectedTags);
              } else {
                updateTags({...selectedTags, [tagId]: true});
              }
            };
            const className = `tag ${selectedTags[tagId] ? 'selected' : ''}`;

            return <div key={tagId} className={className} onClick={onClick}>{tag.name}</div>}
          )}
        </div>
      }
    </div>
  );
}
