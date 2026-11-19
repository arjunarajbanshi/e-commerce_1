import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";

import {
    FiArrowLeft,
    FiArrowRight,
    FiHome,
    FiMapPin,
    FiPhone,
    FiGlobe,
    FiTruck,
    FiShield,
    FiCheckCircle,
    FiPackage,
} from "react-icons/fi";

import PageTitle from "../components/PageTitle";
import CheckoutPath from "./CheckoutPath";
import { saveShippingInfo } from "../features/cart/cartSlice";

const Shipping = () => {
    const { shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user || {});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo?.address || "");
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || "");
    const [phoneNumber] = [null]; // Removed below; use the controlled state instead.

    const [phone, setPhone] = useState(shippingInfo?.phoneNumber || "");
    const [country, setCountry] = useState(shippingInfo?.country || "");
    const [state, setState] = useState(shippingInfo?.state || "");
    const [city, setCity] = useState(shippingInfo?.city || "");

    const selectedCountry = Country.getCountryByCode(country);
    const selectedState = State.getStateByCodeAndCountry(state, country);

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        setState("");
        setCity("");
    };

    const handleStateChange = (e) => {
        setState(e.target.value);
        setCity("");
    };

    const handleShippingInfo = (e) => {
        e.preventDefault();

        if (
            !address.trim() ||
            !pinCode.trim() ||
            !phone.trim() ||
            !country ||
            !state ||
            !city
        ) {
            return toast.error("Please complete all shipping details.");
        }

        if (!/^\d{10}$/.test(phone)) {
            return toast.error("Phone number must contain exactly 10 digits.");
        }

        dispatch(
            saveShippingInfo({
                address: address.trim(),
                pinCode: pinCode.trim(),
                phoneNumber: phone,
                country: country,
                state: state,
                city: city,
            }),
        );

        navigate("/order/confirm");
    };

    const inputClass =
        "w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";

    const selectClass =
        "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed";

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            <PageTitle title="Shipping Information" />

            {/* Checkout Progress */}
            <div className="max-w-6xl mx-auto pt-4">
                <CheckoutPath activePath={0} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
                {/* Page Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <Link
                            to="/cart"
                            className="hover:text-indigo-600 transition-colors"
                        >
                            Shopping Cart
                        </Link>
                        <span>/</span>
                        <span className="text-indigo-600 font-medium">
                            Shipping
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Shipping Details
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        Enter your delivery information to continue with your
                        order.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* LEFT: Shipping Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* Card Header */}
                            <div className="px-5 sm:px-7 py-5 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <FiTruck size={21} />
                                </div>

                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        Delivery Information
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Where should we deliver your order?
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleShippingInfo}
                                className="p-5 sm:p-7 space-y-7"
                            >
                                {/* Address Section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-5">
                                        <FiHome
                                            className="text-indigo-600"
                                            size={17}
                                        />
                                        <h3 className="text-sm font-bold text-gray-900">
                                            Address Details
                                        </h3>
                                    </div>

                                    {/* Street Address */}
                                    <div>
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Street Address
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">
                                            <FiHome className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                            <input
                                                type="text"
                                                id="address"
                                                placeholder="House number, street name, area..."
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                className={inputClass}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Country / State / City */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                                        {/* Country */}
                                        <div>
                                            <label
                                                htmlFor="country"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Country
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">
                                                <FiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />

                                                <select
                                                    id="country"
                                                    value={country}
                                                    onChange={
                                                        handleCountryChange
                                                    }
                                                    className={`${selectClass} pl-11`}
                                                    required
                                                >
                                                    <option value="">
                                                        Select Country
                                                    </option>

                                                    {Country.getAllCountries().map(
                                                        (item) => (
                                                            <option
                                                                value={
                                                                    item.isoCode
                                                                }
                                                                key={
                                                                    item.isoCode
                                                                }
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        {/* State */}
                                        <div>
                                            <label
                                                htmlFor="state"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                State / Province
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                id="state"
                                                value={state}
                                                onChange={handleStateChange}
                                                disabled={!country}
                                                className={selectClass}
                                                required
                                            >
                                                <option value="">
                                                    Select State
                                                </option>

                                                {country &&
                                                    State.getStatesOfCountry(
                                                        country,
                                                    ).map((item) => (
                                                        <option
                                                            value={item.isoCode}
                                                            key={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                City
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>

                                            <select
                                                id="city"
                                                value={city}
                                                onChange={(e) =>
                                                    setCity(e.target.value)
                                                }
                                                disabled={!state}
                                                className={selectClass}
                                                required
                                            >
                                                <option value="">
                                                    Select City
                                                </option>

                                                {country &&
                                                    state &&
                                                    City.getCitiesOfState(
                                                        country,
                                                        state,
                                                    ).map((item) => (
                                                        <option
                                                            value={item.name}
                                                            key={item.name}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>

                                        {/* PIN Code */}
                                        <div>
                                            <label
                                                htmlFor="pinCode"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                PIN Code / ZIP Code
                                                <span className="text-red-500 ml-1">
                                                    *
                                                </span>
                                            </label>

                                            <div className="relative">
                                                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                                <input
                                                    type="text"
                                                    id="pinCode"
                                                    placeholder="Enter postal code"
                                                    value={pinCode}
                                                    onChange={(e) =>
                                                        setPinCode(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={inputClass}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Section */}
                                <div className="pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-2 mb-5">
                                        <FiPhone
                                            className="text-indigo-600"
                                            size={17}
                                        />
                                        <h3 className="text-sm font-bold text-gray-900">
                                            Contact Information
                                        </h3>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Phone Number
                                            <span className="text-red-500 ml-1">
                                                *
                                            </span>
                                        </label>

                                        <div className="relative">
                                            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                            <input
                                                type="tel"
                                                id="phoneNumber"
                                                placeholder="Enter 10 digit phone number"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(
                                                        e.target.value
                                                            .replace(/\D/g, "")
                                                            .slice(0, 10),
                                                    )
                                                }
                                                className={inputClass}
                                                maxLength={10}
                                                inputMode="numeric"
                                                required
                                            />
                                        </div>

                                        <p className="text-xs text-gray-400 mt-2">
                                            We'll use this number for delivery
                                            updates.
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                                    <Link
                                        to="/cart"
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors py-3"
                                    >
                                        <FiArrowLeft size={16} />
                                        Back to Cart
                                    </Link>

                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Continue to Confirmation
                                        <FiArrowRight size={17} />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Information Sidebar */}
                    <aside className="space-y-5">
                        {/* Delivery Card */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
                            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                                <FiPackage size={22} />
                            </div>

                            <h3 className="font-bold text-gray-900">
                                Delivery Information
                            </h3>

                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                Please provide an accurate address so we can
                                deliver your order without any delays.
                            </p>

                            <div className="mt-5 space-y-4">
                                <div className="flex gap-3">
                                    <FiCheckCircle
                                        className="text-green-500 mt-0.5 shrink-0"
                                        size={17}
                                    />
                                    <p className="text-xs text-gray-600">
                                        Ensure your address details are correct.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <FiCheckCircle
                                        className="text-green-500 mt-0.5 shrink-0"
                                        size={17}
                                    />
                                    <p className="text-xs text-gray-600">
                                        Provide an active phone number for
                                        delivery coordination.
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <FiCheckCircle
                                        className="text-green-500 mt-0.5 shrink-0"
                                        size={17}
                                    />
                                    <p className="text-xs text-gray-600">
                                        Review your information before
                                        proceeding.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Security Card */}
                        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center">
                                    <FiShield size={20} />
                                </div>

                                <h3 className="text-sm font-bold text-indigo-900">
                                    Your Information is Safe
                                </h3>
                            </div>

                            <p className="text-xs text-indigo-700 leading-relaxed mt-3">
                                Your shipping information is used to process and
                                deliver your order. Keep your contact
                                information up to date.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
