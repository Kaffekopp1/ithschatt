export async function updateUserStatus(userId) {
<<<<<<< HEAD
  try {
    const response = await fetch('/api/updateUserStatus', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId }),
    });
=======
	try {
		const response = await fetch('http://localhost:3000/api/updateUserStatus', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user_id: userId }),
		});
>>>>>>> 8b2971d (changes in localhost api)

    if (!response.ok) {
      throw new Error(
        `Failed to update status: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
}
