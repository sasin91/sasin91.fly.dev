import AddBox from "@/assets/game/overlay/add_box_FILL0_wght700_GRAD0_opsz48.svg";
import BarcodeScanner from "@/assets/game/overlay/barcode_scanner_FILL0_wght700_GRAD0_opsz48.svg";
import CurrencyYuan from "@/assets/game/overlay/currency_yuan_FILL0_wght700_GRAD0_opsz48.svg";
import Database from "@/assets/game/overlay/database_FILL0_wght700_GRAD0_opsz48.svg";
import DoubleArrow from "@/assets/game/overlay/double_arrow_FILL0_wght700_GRAD0_opsz48.svg";
import EVShadow from "@/assets/game/overlay/ev_shadow_FILL0_wght700_GRAD0_opsz48.svg";
import FlashOn from "@/assets/game/overlay/flash_on_FILL0_wght700_GRAD0_opsz48.svg";
import Fluorescent from "@/assets/game/overlay/fluorescent_FILL0_wght700_GRAD0_opsz48.svg";
import Paintball from "@/assets/game/overlay/paintball.png";
import SafetyCheck from "@/assets/game/overlay/safety_check_FILL0_wght700_GRAD0_opsz48.svg";
import Tenancy from "@/assets/game/overlay/tenancy_FILL0_wght700_GRAD0_opsz48.svg";
import Token from "@/assets/game/overlay/token_FILL0_wght700_GRAD0_opsz48.svg";
import {User} from "@/types";

export default function Overlay({user}: { user: User }) {
    return (
        <div className="absolute top-0 left-0 w-full h-full" id="game-ui">
            <div className="bg-[rgba(1.0, 1.0, 1.0, 0.0)] absolute bottom-12 left-24 h-32 w-96 rounded-xl py-3">
                <div
                    className="flex flex-col justify-end w-full h-full border-4 rounded-md shadow-lg left-ui-area"
                    id="left-ui-area"
                >
                    <div className="flex flex-row items-end justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div
                                className="text-4xl text-white "
                                id="health"
                            >
                                100
                            </div>
                            <div
                                className="text-4xl text-white "
                                id="mana"
                            >
                                100
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <img
                                src={FlashOn}
                                alt="Flashlight"
                                className="ml-0.5 h-6 w-6 bg-contain drop-shadow invert"
                            />
                            <img
                                src={AddBox}
                                alt="Box"
                                className="ml-0.5 h-6 w-6 bg-contain drop-shadow invert"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full gap-1">
                            <div className="ml-0.5 h-6 w-48">
                                <div className="h-full bg-red-500 rounded shadow-md hover:shadow-lg"></div>
                            </div>
                            <div className="m-0.5 h-6 w-48">
                                <div className="h-full bg-blue-500 rounded shadow-md hover:shadow-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute pt-2 pr-2 bg-transparent rounded-lg bottom-64 right-28 h-28 w-96">
                <div
                    className="flex flex-col justify-end w-full h-full transform rounded shadow-md perspective-600 rotate-y-30 rotate-z-3"
                    id="right-ui-area"
                >
                    <div className="flex flex-row items-end justify-center w-full h-full">
                        <div className="flex flex-col items-center justify-center h-full ml-2">
                            <div className=" min-h-[30px] text-white"></div>
                            <div className="weapon-pic-text">25</div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full ml-2">
                            <img
                                src={CurrencyYuan}
                                alt="currency"
                                className="ml-0.5 h-6 min-h-[30px] w-6 bg-cover bg-no-repeat drop-shadow invert"
                            />
                            <img
                                src={SafetyCheck}
                                alt="safety check"
                                className="ml-0.5 h-8 w-8 bg-contain drop-shadow invert"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full ml-2">
                            <div>
                                <div className=" h-4 min-h-[30px] text-white">
                                    👋 {user.name}
                                </div>
                            </div>
                            <img
                                src={Paintball}
                                alt="paintball"
                                className="h-10 bg-no-repeat bg-contain w-28"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute right-28 top-12 h-28 w-96 bg-transparent pr-2.5 pt-2.5">
                <div
                    className="flex flex-col justify-end w-full h-full transform rounded shadow-md perspective-600 -rotate-y-45 -rotate-z-3"
                    id="top-right-ui-area"
                >
                    <div className="flex flex-row items-end justify-center w-full h-full">
                        <img className="mt-1" src={EVShadow} alt="EV shadow"/>
                        <img className="mt-1" src={Tenancy} alt="Tenancy"/>
                        <img
                            className="mt-1"
                            src={Fluorescent}
                            alt="Fluorescent"
                        />
                        <img className="mt-1" src={Database} alt="Database"/>
                        <img
                            className="mt-1"
                            src={BarcodeScanner}
                            alt="Barcode scanner"
                        />
                    </div>
                </div>
            </div>
            <div className="absolute bg-transparent top-48 h-28 w-96 rounded-xl">
                <div className="text-center" id="top-left-ui-area">
                    <div className="flex flex-row items-end justify-center w-full h-full">
                        <img
                            className="drop-shadow invert"
                            src={DoubleArrow}
                            alt="double arrow"
                        />
                        <div className="pt-2 pr-3 text-base text-white -md">
                            Throw some balls
                        </div>
                    </div>
                    <div
                        className="flex h-full w-full min-w-[400px] flex-row items-center justify-center bg-gradient-to-r from-blue-300 via-transparent to-blue-900">
                        <img
                            className="drop-shadow invert"
                            height={32}
                            src={Token}
                            alt="Token"
                        />
                        <div className="ml-2 mr-2 text-base text-gray-100 ">
                            Jump around and stuff
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
