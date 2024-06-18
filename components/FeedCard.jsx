'use client'

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const FeedCard = ({ post, handleTagClick, handleDelete }) => {
	return (
		<div className="flex-1 hover:bg-black/50 text-white hover:border hover:border-gray-500 rounded-md p-4 w-full">
			<div className="flex flex-col justify-between items-start gap-2 w-full">
				<p
					className="font-inter font-semibold text-gray-200 text-xs"
					onClick={() => handleTagClick && handleTagClick(post.tag)}
				>{post.tag}</p>
				<p className="font-satoshi font-semibold text-gray-100 truncate break-words text-xs w-full">{post.url}</p>
			</div>
		</div>
	)
}

export default FeedCard;