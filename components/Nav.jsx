'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import logo from '@public/assets/images/logo.svg';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	const userImage = session?.user.image;
	console.log(session);
	useEffect(() => {
		(async () => {
			const res = await getProviders();
			setProviders(res);
		})();
	}, []);

	return (
		<nav className='flex_between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 flex_between'>
				<Image
					src={logo}
					alt='Website logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>
			{/* Desktop navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>
						{session?.user && (
							<button type='button' onClick={signOut} className='outline_btn'>
								Sign Out
							</button>
						)}

						<Link href='/profile'>
							<Image
								src={userImage}
								width={37}
								height={37}
								alt='Profile link'
								className='rounded-full'
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'>
									Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile navigation */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={userImage}
							width={37}
							height={37}
							alt='Profile link'
							onClick={() => {
								setToggleDropdown((prev) => !prev);
							}}
							className='cursor-pointer rounded-full'
						/>
						{/* Dropdown */}
						{toggleDropdown && (
							<div className='dropdown'>
								<Link
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}>
									Create Prompt
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className='black_btn mt-5 w-full'>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};
export default Nav;
