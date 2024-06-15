'use client'

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const FeedCard = ({ post, handleTagClick, handleDelete }) => {
	return (
		<div className="flex-1 bg-black/50 text-white border border-gray-500 rounded-md p-6">
			<div className="flex flex-col justify-between items-start gap-5">
				<p
					className="font-inter font-semibold text-gray-200 text-sm"
					onClick={() => handleTagClick && handleTagClick(post.tag)}
				>{post.tag}</p>
				<p className="font-satoshi font-semibold text-gray-100">{post.url}</p>
			</div>
		</div>
	)
}

export default FeedCard;