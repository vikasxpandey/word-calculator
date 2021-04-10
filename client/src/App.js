import { useState } from 'react'

const App = () => {
	const [root, setRoot] = useState('')
	const [subtract, setSubtract] = useState('')
	const [add, setAdd] = useState('')
	const [loading, setLoading] = useState(false)
	const [answer, setAnswer] = useState('')

	const getResult = async (root, subtract, add) => {
		setLoading(true)
		setAnswer('')

		let myHeaders = new Headers()
		myHeaders.append('Content-Type', 'application/json')

		let raw = JSON.stringify({
			root,
			subtract,
			add
		})

		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		}
		try {
			const response = await fetch(
				'https://word-calculator.herokuapp.com/',
				requestOptions
			)
			const result = await response.json()
			console.log(result)
			setLoading(false)
			setAnswer(result.result)
		} catch (error) {
			console.log(error)
			setLoading(false)
			setAnswer('An Error Occurred :(')
		}
	}

	return (
		<>
			<nav className='navbar navbar-expand-lg navbar-light bg-light'>
				<div className='container pt-2'>
					<h3 className='navbar-brand'>Word Calculator</h3>
					<p className='text-muted'>Add and Subtract Words</p>
				</div>
			</nav>

			<main className='container mt-5'>
				<div className='row'>
					<div className='col-md-4'>
						<div className='form-group'>
							<label>Root Word</label>
							<input
								className='form-control'
								value={root}
								onChange={(e) => setRoot(e.target.value)}
							/>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='form-group'>
							<label>Subtract Word</label>
							<input
								className='form-control'
								value={subtract}
								onChange={(e) => setSubtract(e.target.value)}
							/>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='form-group'>
							<label>Add Word</label>
							<input
								className='form-control'
								value={add}
								onChange={(e) => setAdd(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className='text-center mt-5'>
					<button
						disabled={!root || !subtract || !add || loading}
						className='btn btn-danger btn-lg'
						onClick={() => getResult(root, subtract, add)}
					>
						{loading ? 'Please Wait...' : 'Calculate'}
					</button>
				</div>
				<div className='mt-5 text-center'>
					<h2>{answer ?? ''}</h2>
				</div>
			</main>
		</>
	)
}

export default App
