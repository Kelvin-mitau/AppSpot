import { useState } from 'react'
import { Form, json, MetaFunction, redirect, useActionData, useParams } from '@remix-run/react'
import { ActionFunction, ActionFunctionArgs } from '@remix-run/node'
import imageToBase64 from '../../functions/toBase64'
import AboutMe from './AboutMe'
import AboutBusiness from './AboutBusiness'
import PaymentCollection from './PaymentCollection'
import Layout from '../Layout'
import { User } from '../../DB/models'


export const meta: MetaFunction = () => {
    return (
        [{
            title: "Complete Account",
            description: "Finish setting up your profile to enjoy all features of the app."
        }]
    )
}

function CompleteAccount() {
    const userID = useParams().userID
    const [currentForm, setCurrentForm] = useState(1)
    const [paymentOption, setPaymentOption] = useState<"card" | "paypal">("card")

    const [profilePicture, setProfilePicture] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])
    const [tagInputValue, setCurrentInputValue] = useState<string>("")

    const actionData = useActionData<{ error: string }>()

    const popularTags = `#Crm-expert#Marketing-automation#Project-management#HRSoftware#Accounting-software#Ecommerce#Customer-engagement#Analytics-guru#Collaboration-tools#Cybersecurity#Fintech-solutions#Health-tech#edtech#IOT-platform#AI-and-ML#Shopify#Landing-page#SAAS`
    const popularTagsArr = popularTags.split("#")

    const handleImageUpload = async (files: any) => {
        const base64Val = await imageToBase64(files[0])
        setProfilePicture(base64Val);
    }
    const handleSubmit = (event: any) => {
        event.preventDefault()

        const form = event.target
        const tagsInput = document.createElement("input")
        tagsInput.style.display = "none"
        tagsInput.name = "tags"
        tagsInput.value = tags.join(",")
        form.append(tagsInput)

        if (profilePicture) {
            const formData = new FormData()
            formData.append("productFile", profilePicture)
            formData.append("productFileType", ".txt")
            formData.append("sellerID", userID || "")

            fetch("/megaUpload", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(({ link, error }) => {
                    if (error) {
                        return;
                    }
                    else {
                        const profilePictureInput = document.createElement("input")
                        profilePictureInput.style.display = "none"
                        profilePictureInput.name = "profilePicture"
                        profilePictureInput.value = link
                        form.append(profilePictureInput)

                        event.target.submit()
                    }
                }).catch(err => console.error(err))
        }

        const profilePictureInput = document.createElement("input")
        profilePictureInput.style.display = "none"
        profilePictureInput.name = "profilePicture"
        profilePictureInput.value = ''
        form.append(profilePictureInput)
        event.target.submit()

    }
    const handleCurrentTagInput = (e: any) => {
        setCurrentInputValue(e.target.value)
    }
    const handleAppendTag = () => {
        const tagInput: any = document.getElementById("tag-input")
        setTags([...tags, tagInputValue])
        tagInput.value = ""
    }
    return (
        <Layout>
            <Form className="flex flex-col w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 mx-auto my-2" method='put' preventScrollReset onSubmit={handleSubmit}>
                <div>
                    <div className={currentForm != 1 ? "hidden" : ""}>
                        <AboutMe handleAppendTag={handleAppendTag} handleCurrentTagInput={handleCurrentTagInput} handleImageUpload={handleImageUpload} popularTagsArr={popularTagsArr} profilePicture={profilePicture} setCurrentForm={setCurrentForm} setTags={setTags} tags={tags} />
                    </div>
                    <div className={currentForm != 2 ? "hidden" : ""}>
                        <h2 className='text-white text-center text-2xl my-2'>Tell Us More About Your business</h2>
                        <AboutBusiness setCurrentForm={setCurrentForm} />
                    </div>
                    <div className={currentForm != 3 ? "hidden" : ""}>
                        <h2 className='text-white text-center text-2xl my-2'>Paypal Payment Collection Information</h2>
                        <PaymentCollection profilePicture={profilePicture} paymentOption={paymentOption} setCurrentForm={setCurrentForm} setPaymentOption={setPaymentOption}
                            errorMSG={actionData?.error} />
                    </div>
                </div>
            </Form>
        </Layout>
    )
}
export default CompleteAccount

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
    try {
        let req: any = {};
        (await request.formData()).forEach((value: any, key: any) => {
            if (key) req[key] = value;
        });
        const userID = params.id
        const { businessName, businessWebsiteURL, businessPhoneNumber, businessEmail, businessDescrition, businessPhoneNumberCountryCode } = req
        const { cardHolderName, cardNumber, expirationDate, CVV, billingAddress, city, country, paymentEmail, postalCode } = req
        const { paymentCollectionMethod, paypalName, paypalEmail } = req

        const paymentCollectionDetails = paymentCollectionMethod == "card" ? { paymentCollectionMethod, cardHolderName, cardNumber, expirationDate, CVV, billingAddress, city, country, paymentEmail, postalCode } : { paymentCollectionMethod: paymentCollectionMethod ? paymentCollectionMethod : "paypal", paypalName, paypalEmail }
        await User.findByIdAndUpdate(userID, {
            $set: {
                businessDetails: { businessName, businessWebsiteURL, businessPhoneNumber, businessEmail, businessDescrition, businessPhoneNumberCountryCode },
                paymentsDetails: paymentCollectionDetails,
                tags: req.tags,
                bio: req.bio,
                profilePicture: req.profilePicture,
            }
        })
        return redirect(`/account/${userID}`)
    }
    catch (err) {
        console.log(err)
        return json({ error: "Oops..Something went wrong on our side" })
    }
}