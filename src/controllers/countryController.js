import axios from 'axios';
import catchAsyncErrors from '../middlewares/catchAsyncError.js';

// Get companies   =>    {{url}}/api/countries
export const getCountry = catchAsyncErrors(async (req, res, next) => {
  try {
    // Fetch data from the external API
    const apiResponse = await axios.get('https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json');
    const countriesData = apiResponse.data;

    // Check if the data is empty or missing
    if (!countriesData || countriesData.length === 0) {
      return res.status(200).json({
        status: 200,
        code: '200',
        data: [],
        message: 'No data available',
      });
    }

    // Extract and format the data
    const responseData = {
      status: 200,
      code: '200',
      data: countriesData.map((country) => ({
        name: country.name || '',
        region: country.region || '',
        timezones: country.timezones || [],
      })),
      message: 'Success',
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

