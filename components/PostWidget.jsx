import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

import {
  getRecentPosts,
  getSimilarPosts,
} from '../services';
import { graphCMSImageLoader } from '../util';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result),
      );
    } else {
      getRecentPosts().then((result) =>
        setRelatedPosts(result),
      );
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? 'Articles Similaires' : 'Articles Récents'}
      </h3>
      {relatedPosts.map((post, index) => (
        <div
          key={index}
          className="flex items-center w-full mb-4"
        >
          <div className="w-16 flex-none">
            <Image
              loader={graphCMSImageLoader}
              alt={post.title}
              unoptimized
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format(
                'DD MMM, YYYY',
              )}
            </p>
            <Link
              href={`/post/${post.slug}`}
              className="text-md"
              key={post.title}
            >
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
