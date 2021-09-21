import React, { useEffect, useState, useRef } from 'react';
import { trimFileName } from './utils';

export default function DropdownMenu({ fileNames, selectFile }: DropdownMenuProps) {
	const dropdownRef = useRef<HTMLElement>(null);
	const [ isActive, setIsActive ] = useState(false);
	useEffect(
		() => {
			const pageClickEvent = (e: any) => {
				if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
					setIsActive(!isActive);
				}
			};

			// If the item is active (ie open) then listen for clicks
			if (isActive) {
				window.addEventListener('click', pageClickEvent);
			}

			return () => {
				window.removeEventListener('click', pageClickEvent);
			};
		},
		[ isActive ]
	);

	const toggleActive = () => setIsActive(!isActive);

	return (
		<div className="menu-container">
			<button onClick={toggleActive} className="menu-trigger">
				<span>Files</span>
			</button>
			<nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
				<ul>
					{fileNames.map((fileName: string, fileIndex: number) => {
						return (
							<li>
								<button
									onClick={() => {
										selectFile(fileIndex);
                                        setIsActive(false);
									}}
								>
									{trimFileName(fileName)}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

type DropdownMenuProps = {
	fileNames: string[];
	selectFile: (fileIndex: number) => void;
};
