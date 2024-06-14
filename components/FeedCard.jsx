'use client'

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const FeedCard = ({ post, handleTagClick, handleDelete }) => {
	return (
		<div className="prompt_card cursor-pointer">
			<div className="flex flex-col justify-between items-start gap-5">
				<p
					className="font-inter font-semibold text-gray-900 text-sm"
					onClick={() => handleTagClick && handleTagClick(post.tag)}
				>{post.tag}</p>
				<p className="font-satoshi font-semibold text-gray-900">{post.url}</p>
			</div>
		</div>
	)
}

export default FeedCard;