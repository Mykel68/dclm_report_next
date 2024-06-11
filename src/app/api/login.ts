import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

type ResponseData = {
	message: string;
	response: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	try {
		const { email } = req.body;
		const data = await axios.post(
			process.env.BASE_API_DEV! + '/auth/resend/otp',
			{
				email,
			},
			{
				headers: {
					'x-api-key': process.env.X_API_KEY!,
				},
			}
		);
		res.status(200).json({
			message: 'OTP resent successfully',
			response: await data.data,
		});
	} catch (e) {
		const response = (e as AxiosError<{ message: string }>).response;
    console.log(e)
		res.status(response?.status ?? 400).json({
			message: response?.data?.message ?? 'An error occurred!',
			response: response?.status,
		});
	}
}