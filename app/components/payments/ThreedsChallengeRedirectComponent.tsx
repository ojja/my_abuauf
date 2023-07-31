import { useEffect, useState } from 'react';
import { checkMPGS } from '~/api/common';
import useShoppingCart from '~/stores/cartStore';
import Loader from '../Loader';

function ThreedsChallengeRedirectComponent({ response, sessionID }: any) {
    const [creqValue, setCreqValue] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { resetCart } = useShoppingCart();
    console.log('sessionID', sessionID)

    useEffect(() => {
        if (response) {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(response.html, 'text/html');
            const creqInput = htmlDoc.querySelector('input[name="creq"]');
            if (creqInput) {
                const value = creqInput.value;
                console.log('value', value);
                setCreqValue(value);
            }
            const timeout = setTimeout(() => {
                const form = document.getElementById('threedsChallengeRedirectForm');
                if (form) {
                    form.submit();
                }
            }, 2000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [response]);

    useEffect(() => {
        const handleIframeMessage = (event: MessageEvent) => {
            if (event.source !== iframe.contentWindow) {
                return;
            }
            const paymentStatus = event.data;
            setPaymentStatus(paymentStatus);

        };

        const iframe = document.getElementById('challengeFrame') as HTMLIFrameElement;
        if (iframe) {
            window.addEventListener('message', handleIframeMessage);
            window.addEventListener("message", (event) => {
                console.log(`Received message: ${event.data}`);
                const receivedData = JSON.parse(event.data);
                if (receivedData.result === "SUCCESS") {
                    setIsLoading(true);
                    setTimeout(() => {
                        checkMPGS(sessionID)
                            .then(result => {
                                console.log(result);
                                const orderID = result.orderID;
                                console.log("API 200", orderID);
                                const thanksURL = `/thanks?orderID=${orderID}`;
                                setTimeout(() => {
                                    resetCart();
                                    window.location.href = thanksURL;
                                }, 2000);
                            })
                            .catch(error => {
                                console.error("Error:", error);
                            });
                    }, 2000);
                }
            });
            return () => {
                window.removeEventListener('message', handleIframeMessage);
            };
        }
    }, []);


    return (
        <div>
            <div id="threedsChallengeRedirect" style={{ height: '400px' }}>
                <form id="threedsChallengeRedirectForm" method="POST" action="https://mtf.gateway.mastercard.com/acs/mastercard/v2/prompt" target="challengeFrame">
                    <input type="hidden" name="creq" value={creqValue} />
                </form>
                <iframe id="challengeFrame" name="challengeFrame" width="100%" height="100%" />
            </div>
            {isLoading ? (
                <div className="absolute z-20 flex items-start justify-center pt-20 bg-gray-200 bg-opacity-75 -inset-4">
                    <Loader />
                </div>
            ) : ('')}
        </div>
    );
}

export default ThreedsChallengeRedirectComponent;
