import React from 'react'
import './NotFoundPage.css'

const notFoundPage = () => {
	return (
		<div class="Parent">
			<div class="notfound">
				<div class="notfound-404">
					<div></div>
					<h1>404</h1>
				</div>
				<h2>Page not found</h2>
				<p>The page you are looking for might have been removed, had its name changed, or doesn't exist.</p>
				<a href="/NetflixClone/login">Back to login</a>
			</div>
		</div>
	)
}

export default notFoundPage