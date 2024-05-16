import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Blob } from "./blob";
import { Das } from "./das";
import { Fraud } from "./fraud";
import { Header } from "./header";
import { Node } from "./node";
import { P2P } from "./p2p";
import { Share } from "./share";
import { State } from "./state";

export class Client {
    url: string;
    apiKey: string;
    log: boolean;
    axiosInstance: AxiosInstance;
    Blob: Blob;
    Das: Das;
    Fraud: Fraud;
    Header: Header;
    Node: Node;
    P2P: P2P;
    Share: Share;
    State: State;

    constructor(url: string, apiKey: string, log: boolean = false) {
        this.url = url;
        this.apiKey = apiKey;
        this.log = log;

        this.axiosInstance = axios.create({
            baseURL: this.url,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`,
            },
        });

        this.Blob = new Blob(this);
        this.Das = new Das(this);
        this.Fraud = new Fraud(this);
        this.Header = new Header(this);
        this.Node = new Node(this);
        this.P2P = new P2P(this);
        this.Share = new Share(this);
        this.State = new State(this);
    }

    async request(payload: any): Promise<any> {
        try {
            const response: AxiosResponse = await this.axiosInstance.post('/', payload);

            if (response.data.error) {
                throw new Error(`${response.data.error.message}`);
            }

            // Handle the JSON-RPC response
            return response.data.result;
        } catch (error: any) {
            // Handle any errors that occurred during the fetch
            if (axios.isAxiosError(error)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                throw new Error(`Axios error during fetch: ${error.message}`);
            } else {
            // Non-Axios error handling
                throw new Error(`Error during fetch: ${error}`);
            }
        }
    }
}
