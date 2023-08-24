import axios from 'axios'
import apiClient from '@/service/apiClient'
class ApiService {
    async request(...options) {
        options = options[0]
        let response, error
        let jwt = window.localStorage.getItem('token')
        if (jwt) {
            options.header = {}
            options.header['Authorization'] = `Bearer ${jwt}`
        }
        const header = options.header || {}
        // const url = 'http://nasdemo-website.click' + options.url
        const url = options.url
        try {
            const data = {
                method: options.method.trim().toLowerCase(),
                url: url,
                headers: header
            }
            if (data.method === 'get' || data.method === 'delete')
                data.params = options.data || null
            else
                data.data = options.data || null
            if (options.blob)
                data.responseType = 'blob'
            if (options.timeout)
                data.timeout = options.timeout

            if (options.file) {
                const formData = new FormData();

                formData.append('files', options.file);
                // data.headers['Content-Type'] = 'multipart/form-data';
                data.data = formData;
            }

            // if (options.files) {
            //     const bimage = new FormData();
            //     if (options.data) {
            //         for (let row in options.data) {
            //             bimage.append(row, options.data[row]);
            //         }
            //     }
            //     for (let i = 0; i < options.files.length; i++) {
            //         bimage.append('file', options.files[i]);
            //     }
            //     // data.config = { headers: { 'Content-Type': 'multipart/form-data' } }
            //     data.data = bimage;
            // }

            // if(apiClient) {
            //     if (data.params) {
            //         response = await apiClient.get(url,{
            //             params:  data.params
            //         })
            //     } else {
            //         response = await apiClient.get(url)
            //     }
            // } else {
            response = await axios(data)
            // }
            response = response.data
        } catch (e) {
            error = e
        }
        if (error) {
            if (error.response) {
                // this.$bvToast.toast(error.response.data.error.message, {
                //     title: 'Lỗi',
                //     autoHideDelay: 5000,
                //     appendToast: append
                //   })
                response = error.response.data
            }

            if (!response) {
                response = {
                    meta: { success: false },
                    error: { message: error.message }
                }
            }
        }

        // if (typeof response !== 'object')
        //     response = {
        //         meta: { success: false },
        //         error: { message: error.response.statusText }
        //     }

        return response
    }
}

export default new ApiService
