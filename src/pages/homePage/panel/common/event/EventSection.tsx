import {useGetEvents} from "@pages";


const EventSection = () => {

    const events = useGetEvents();

    return (
        <div>
            Event Section
        </div>

    );
}

export default EventSection;