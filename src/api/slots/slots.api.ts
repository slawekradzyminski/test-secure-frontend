import { apiUrl, postRequestOptions } from "../apiCommons";
import { handleResponse } from "../responseHandler";

export type CreateSlotRangeDto = {
  username: string;
  startAvailability: Date;
  endAvailability: Date;
  slotDurationMinutes: number;
};

const formatCreateSlotRangeDto = (dto: CreateSlotRangeDto) => {
  return {
    username: dto.username,
    startAvailability: dto.startAvailability.toISOString(),
    endAvailability: dto.endAvailability.toISOString(),
    slotDuration: `PT${dto.slotDurationMinutes}M`
  };
};

export const createSlots = async (createSlotRangeDto: CreateSlotRangeDto) => {
  const formattedDto = formatCreateSlotRangeDto(createSlotRangeDto);
  const response = await fetch(`${apiUrl}/slots`, postRequestOptions(formattedDto));
  return handleResponse(response);
};