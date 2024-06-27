'use client'

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FeedIcon from '@components/FeedIcon'

const FeedCard = ({ post, handleTagClick, handleDelete }) => {

	return (
		<div className="flex flex-col flex-shrink-0 gap-4 p-4 border border-gray-500 rounded-md bg-black/50 hover:bg-black hover:border-white cursor-pointer w-full">
			<div className="flex justify-between items-start gap-2 w-full">
				<FeedIcon siteUrl={post.url} />
				<p className="font-satoshi font-semibold truncate break-words text-xs w-full">{post.url}</p>
			</div>
		</div>
	)
}

export default FeedCard;