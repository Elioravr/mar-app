import React, {useState, useEffect} from 'react';
import {fetchTags} from '../services/api';
import Loading from './Loading';

export default () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTags().then(tags => {
      setIsLoading(false);
      setTags(tags);
    })
  }, []);

  return (
    <div className="tag-manager-container">
      <div className="title">להוסיף תגיות למנה?</div>
      {isLoading ?
        <Loading text="טוען תאגים..." loadingSize="small" />
        :
        <div className="tags-list">
          {tags.map(tag => <div key={tag.id} className="tag">{tag.name}</div>)}
        </div>
      }
    </div>
  );
}
